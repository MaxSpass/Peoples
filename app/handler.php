<?php
session_start();
// getenv('HTTP_X_FORWARDED_FOR')
new post_contact($_POST);

class post_contact
{

    public function __construct($post_data)
    {
        $this->send_contact_form($post_data);
    }

    function send_contact_form($post_data)
    {

        $main_email = 'maxspas1@gmail.com';
//        $boss_email = 'test@gmail.com';


        if(isset($_POST['form']) && isset($_POST['page']))
        {

            // Main Email
            $headers = "MIME-Version: 1.0" . PHP_EOL .
                "Content-Type: text/html; charset=utf-8" . PHP_EOL .
                'From: '.$main_email.' <'.$main_email.'>' . PHP_EOL;



            $message = '<p style="font-size:16px;color:green">Форма: <b>'.$_POST['form'].'</b></p>';
            $message .= '<p style="font-size:16px;color:green">Источник: <b>'.$_POST['page'].'</b></p>';
            $message .= '<p style="font-size:16px;color:green">IP: <b>'.$_SERVER['REMOTE_ADDR'].'</b></p>';
            if(isset($_POST['name'])) {
                $message .= '<p style="font-size:16px;color:green">Имя: <b>'.$_POST['name'].'</b></p>';
            }
            if(isset($_POST['phone'])) {
                $message .= '<p style="font-size:16px;color:green">Телефон: <b>'.$_POST['phone'].'</b></p>';
            }
            if(isset($_POST['email'])) {
                $message .= '<p style="font-size:16px;color:green">Email: <b>'.$_POST['email'].'</b></p>';
            }
            if(isset($_POST['comment'])) {
                $message .= '<p style="font-size:16px;color:green">Сообщение: <b>'.$_POST['comment'].'</b></p>';
            }
            if(isset($_POST['Url'])) {
                $message .= '<p style="font-size:16px;color:green">Сайт: <b>'.$_POST['url'].'</b></p>';
            }

            if(isset($_POST['all_inclusive'])) {
                $message .= '<p style="font-size:16px;color:maroon">Заинтересовало: <b>'.$_POST['all_inclusive'].'</b></p>';
            }
            if(isset($_POST['context_ads'])) {
                $message .= '<p style="font-size:16px;color:maroon">Заинтересовало: <b>'.$_POST['context_ads'].'</b></p>';
            }
            if(isset($_POST['social_content'])) {
                $message .= '<p style="font-size:16px;color:maroon">Заинтересовало: <b>'.$_POST['social_content'].'</b></p>';
            }
            if(isset($_POST['target_ads'])) {
                $message .= '<p style="font-size:16px;color:maroon">Заинтересовало: <b>'.$_POST['target_ads'].'</b></p>';
            }
            if(isset($_POST['chat_bot'])) {
                $message .= '<p style="font-size:16px;color:maroon">Заинтересовало: <b>'.$_POST['chat_bot'].'</b></p>';
            }



            mail($main_email, 'From: ludi.digital', $message, $headers );

            var_dump($_POST['form']);

            // Sub Email
//            $headers = "MIME-Version: 1.0" . PHP_EOL .
//                "Content-Type: text/html; charset=utf-8" . PHP_EOL .
//                'From: '.$boss_email.' <'.$boss_email.'>' . PHP_EOL;
//            $message = '<p style="font-size:18px;color:grey">Form: <span style="font-size:20px;color:#000">"Main Top Form"</span></p>';
//            $message .= '<p style="font-size:18px;color:grey">IP: <span style="font-size:20px;color:#000">'.$_SERVER['REMOTE_ADDR'].'</span></p>';
//            $message .= '<p style="font-size:18px;color:grey">Name: <span style="font-size:20px;color:#000">'.$_POST['name'].'</span></p>';
//            $message .= '<p style="font-size:18px;color:grey">Email: <span style="font-size:20px;color:#000">'.$_POST['email'].'</span></p>';
//            $message .= '<p style="font-size:18px;color:grey">Phone: <span style="font-size:20px;color:#000">'.$_POST['tel'].'</span></p>';
//            $message .= '<p style="font-size:18px;color:grey">Message: <span style="font-size:20px;color:#000">'.$_POST['msg'].'</span></p>';
//
//            mail($boss_email, 'Main Top Form', $message, $headers );

        }
    }
}
