## **User**

|id(PK)|name|email|pwd|salt|
|-|-|-|-|-|

## **Post**

|id(PK)|userId(FK->User.id)|likeCnt|content|createdAt|
|-|-|-|-|-|

## **Like**

|userId(FK->User.id)|postId(FK->Post.id)|
|-|-|

