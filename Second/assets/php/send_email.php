<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];
$email = $data["email"];
$phone = $data["phone"];
$quantity = $data["quantity"];

$price = 0;
if ($quantity >= 1 && $quantity <= 10) $price = 10;
elseif ($quantity >= 11 && $quantity <= 100) $price = 100;
elseif ($quantity >= 101 && $quantity <= 1000) $price = 1000;

$to = $email;
$subject = "Order Details";
$message = "Name: $name\nEmail: $email\nPhone: $phone\nQuantity: $quantity\nPrice: $$price";
$headers = "From: no-reply@yourdomain.com";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode("success");
} else {
    echo json_encode("failure");
}
?>