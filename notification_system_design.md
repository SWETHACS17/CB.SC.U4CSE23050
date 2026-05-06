### STAGE 1
 

## Requirements:

- Design a REST API to show the notification when the customer logs in.
- Identify core actions that notification platform should support.
- REST API end points, JSON request, response, header structure.
- Design a Real-time notfications systems.

## Architectural And Tech-Stack Decisions:

For any real-time notification System we need to use **Web Scokets** along with REST API for real-time support. In a typical notification we could observe these components,

```
{
 "id" : NotificationID ,
 "title" : "NotificationTitle" ,
 "body" : "NotificationBody" ,
 "type" " "NotificationType" ,
 "timestamp" : "NotificationTimestamp" 
}
```
This above schema will be the response for the notification system after the user logged in. 
