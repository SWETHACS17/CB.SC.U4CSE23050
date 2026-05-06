# STAGE 1
 

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
 "status" : "NotificationStatus" 
}
```
This above schema will be the response for the notification system after the user logged in. 

```
This is the outline of USER detials:
let users = [
{  "id" : UserId ,
   "name" : "UserName" ,
   "email" : "MailID" ,
   "loggedIn" : "True" ,
   "notifications" : [
         {
         "nId" : "nID" ,
         "ntitle" : "NotificationTitle" ,
         "nbody" : "NotificationBody" ,
         "ntype" " "NotificationType" ,
         "ntimestamp" : "NotificationTimestamp"
          "status" : "NotificationStatus" 
        } ,
]},
]
```

## REST API End-Points:

- Contains all notifications of a user:
```
METHOD : GET
"/users/:id/:notifications/" 
```
- To fetch a single notification from a user:
```
METHOD : GET
"/users/:id/:notifications/:notificationID" 
```
- To Delete a notification before it is sent:
```
METHOD : DELETE
"/users/:id/:notifications/:notificationID" 
```
- To create a notification for a user:
```
METHOD : POST
"/users/:id/:notifications/" 
```

# STAGE 2

## Preferred Persistent storage with Reason:

We will implement this in **NoSQL Database** , becase it is flexible and faster access time and highly scalable. We want to integrate real-time functionality, with the help of web sockets for that implemention that in a NoSQL database will be much faster than the SQL database. So we could for NoSQL databases like Firebase, MongoDB etc.

Database Schema(collection\Document): 
```
{
 "id" : NotificationID ,
 "title" : "NotificationTitle" ,
 "body" : "NotificationBody" ,
 "type" " "NotificationType" ,
 "timestamp" : "NotificationTimestamp"
 "status" : "NotificationStatus" 

}
```
As the data volume increases the problem with using NoSQL might be , it is less structured than the SQL database, so as DB size and operations and structures increase, it might be difficult to keep it flexible without loseing the managebility of the system. This could be avoided by proper documentation of the APIs and related informationa dn details.

I will be writing a SQL quesry to fetch all users who are logged into the system:
```
SELECT * FROM users where loggedIn = "True" ;
```
## Sample output:
```
1 , UserName , example@email.com , True ,[ 1234 , Congratulations , You are selected , Result , 15:39:002026-05-06 , unerad ]
```

# STAGE 3

This query is inefficient in a few ways, 
1. Selecting * from the notifications table would probably include all the fields that the notifications table has (eg. title, body, tyoe, timestamp, status etc..) but if the requirement is to fetch all the notifications(ie. body) alone frmo a single user, so instead of fetching the whole table, only the required information can be mentioned.
2. Here ASC keyword is neglible, will automatically ordered by Ascending order.
3. Create Index only to studentID column.
4. These are the things that i would change to make it efficient.

### Teammate suggests adding indexes on every column:
This might not be effective always, because we create indexes for faster retrival time and cost, if we index everyhting it is not the effective solution, instead we could index StudentID alone, this will perform better.

## Query to find all the students who got a placement notification in last 7 days:
```
SELECT * FROM notifications
WHERE notificationType = "Placement"
ORDER BY notificationTimestamp  DESC LIMIT 7 ;
```

# STAGE 4

We should use **useEffect** functionality properly, so that we could limit the number of reloads and DB fetches from a particular function.

SOLUTION:
1. We could cache the recent changes (ie. time of recent notification sent)
2. And have it in the Main Memory
3. Everytime the page reloads this cache will check for the **last_modified** date and time of the notifications.
4. If the  **last_modified** is changed then alone allow the function to fetch from the Database otherwise do notfetch it.
5. Whenever  **last_modified** is updated the if reloaded, display the new notification once alone to the user.
6. This would improve the performance and user experience.
7. Trade off: This might mean that we always need to keep a cache of the  **last_modified**  to check for new notifications, if we miss to chaeck it then user might not get new notifications.

# STAGE 5

1. There might be a email API rate limiter, so 200 students failed to get the emails.
2. The process of sending email and saving to DB might happen together, that completely depends on the OS and the number of core the HR laptop might be using.
3. We might limit the process by breaking it.
Revised pesudo code:
```
function notify_all(student_id: array, message : string):
    int m = 0;
    int n = 5000;
    for student_id in student_ids range(m,n):
       send_email(..);
       save_db(..);
       push_to_app(..);
     n +=5000;
     m = n;
``` 





















