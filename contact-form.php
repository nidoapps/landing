<?php
$name= $_POST['name'];
$emailHelp= $_POST['emailid'];
$comments=$_POST['msg'];

if(isset($name) && isset($emailHelp))
{
	global $to_email,$vpb_message_body,$headers;
	$to_email="dev@nidoapp.io";
	$vpb_message_body = nl2br("Saludos,\n
	El usuario cuyo detalle se muestra a continuación ha enviado este mensaje desde ".$_SERVER['HTTP_HOST']." dated ".date('d-m-Y').".\n
	
	nombre: ".$name."\n
	Email: ".$emailHelp."\n
	Mensaje: ".$comments."\n
	User Ip:".getHostByName(getHostName())."\n
	Gracias!\n\n");
	
	//Set up the email headers
    $headers    = "From: $name <$emailHelp>\r\n";
    $headers   .= "Content-type: text/html; charset=iso-8859-1\r\n";
    $headers   .= "Message-ID: <".time().rand(1,1000)."@".$_SERVER['SERVER_NAME'].">". "\r\n"; 
   
	 if(@mail($to_email, $vpb_message_body, $headers))
		{
			$status='Success';
			//Displays the success message when email message is sent
			$output="Excelente ".$name.", ¡Su correo electrónico ha sido enviado exitosamente! Nos comunicaremos con usted lo antes posible. Gracias.";
		} 
		else 
		{
			$status='error';
			 //Displays an error message when email sending fails
			$output="Lo sentimos, su correo electrónico no se pudo enviar en este momento. Inténtelo de nuevo o comuníquese con el administrador de este sitio web para informar este mensaje de error si el problema persiste. Gracias.";
		}	
}
else
{
	echo $name;
	$status='error';
	$output="por favor completa los campos requeridos";
}

echo json_encode(array('status'=> $status, 'msg'=>$output));
?>