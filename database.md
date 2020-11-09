## **User**

|id(PK)|name|email|pwd|salt|
|-|-|-|-|-|

## **Post**

|id(PK)|userId(FK->User.id)|title|content|date|
|-|-|-|-|-|

## **Like**

|id(PK)|userId(FK->User.id)|postId(FK->Post.id)|
|-|-|-|

