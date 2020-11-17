## **User**

|id(PK)|name|email|pwd|salt|
|-|-|-|-|-|

## **Post**

|id(PK)|UserId(FK->User.id)|likeCnt|content|createdAt|
|-|-|-|-|-|

## **Like**

|UserId(FK->User.id)|PostId(FK->Post.id)|
|-|-|

