
#select dayofweek(timestamp) dow, hour(timestamp) h, count(*) from message where timestamp > DATE_SUB(curdate(), INTERVAL 8 DAY) and timestamp < curdate() group by dow, h;

#select count(*) from message WHERE timestamp < curdate();

select UNIX_TIMESTAMP(curdate());