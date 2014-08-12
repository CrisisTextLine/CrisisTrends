<?php

require 'vendor/autoload.php';

require_once('config.php');
/*
$resp = recaptcha_check_answer(
    $config['captcha_key'],
    $_SERVER['REMOTE_ADDR'],
    $_POST['recaptcha_challenge_field'],
    $_POST['recaptcha_response_field']
);
*/

if (false && !$resp->is_valid) {
    die ("The reCAPTCHA wasn't entered correctly. Go back and try it again." .
        "(reCAPTCHA said: " . $resp->error . ")");
} else {
    $subject = (empty($_POST['subject'])) ? 'Data Contact Requeset' : $_POST['subject'];

    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $config['email_user'];
    $mail->Password = $config['email_pass'];
    $mail->SMTPSecure = 'tls';

    $mail->From = $config['email_user'];
    $mail->FromName = $_POST['name'];
    $mail->Subject = $_POST['subject'];
    $mail->Body = $_POST['message'];

    $mail->addReplyTo($_POST['email'], $_POST['name']);

    $mail->addAddress('data@crisistextline.org');
    //$mail->addAddress('chris@crisistextline.org');

    if (!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        header('Location: index.html?success');
    }
}
