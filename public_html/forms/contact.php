<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = $_SERVER['SMTP_RECV_EMAIL'];

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  $contact->to = $receiving_email_address;
  $contact->from_name = $_SERVER['SMTP_SEND_NAME'];
  $contact->from_email = $_SERVER['SMTP_SEND_EMAIL'];
  $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  $contact->smtp = array(
    'host' => $_SERVER['SMTP_HOST'],
    'username' => $_SERVER['SMTP_USER'],
    'password' => $_SERVER['SMTP_PASSWORD'],
    'port' => $_SERVER['SMTP_PORT'],
    'mailer' => $_SERVER['SMTP_SEND_EMAIL']
  );


  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);
  $contact->recaptcha_secret_key = $_SERVER['GOOGLE_KEY'];

  echo $contact->send();
?>
