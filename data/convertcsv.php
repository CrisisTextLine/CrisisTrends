<?php

$handle = fopen('msgs-hr.csv', 'r');

$times = array();

fgetcsv($handle); // ignore first line

while ($data = fgetcsv($handle)) {
    $dow = intval($data[0]);
    $tod = intval($data[1]);
    $times[$dow][$tod] = intval($data[2]);
}

file_put_contents('times.json', json_encode($times));
