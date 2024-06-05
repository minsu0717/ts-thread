# ts-thread

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E6?style=for-the-badge&logo=Node.js&logoColor=white)
![Mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<h2>⭐ Docker-compose 사용</h2>

![image](https://github.com/minsu0717/ts-thread/assets/96038772/42ff22d5-e9bb-4edd-9b5c-5c42f284d24c)
<h2>⭐ 카카오 로그인 API</h2>

![image](https://github.com/minsu0717/ts-thread/assets/96038772/318aa2aa-38fc-4200-8c53-ecc717e0d75f)
- redirect를 이용하여 인가 토큰 받는다
- axios를 이용하여 인가 코드를 보내서 accesstoken 을 받고, 로그인
- 로그인 시 db에 없으면 db에 저장
  
<h2>⭐ thread create API</h2>

![image](https://github.com/minsu0717/ts-thread/assets/96038772/243c0a2e-3e25-427f-be14-82303deee8ed)
![image](https://github.com/minsu0717/ts-thread/assets/96038772/5466e3b6-5b4e-4893-8273-19b232a2c90e)

- header 에 인증 토큰을 넣어서 이용
- db에 create

<h2>⭐ thread 조회 API</h2>

![image](https://github.com/minsu0717/ts-thread/assets/96038772/6ef8aa19-5d15-46ed-a2ff-88c2aa936ed4)

- aggregate 이용하여 user, threads, likes 컬렉션 연결하여 조회
- 주소에 thread id를 path parameter로 넣으면 detail 조회

<h2>⭐ thread 변경 API</h2>

![image](https://github.com/minsu0717/ts-thread/assets/96038772/79ec20ea-1e2f-4a4e-9264-d48a0183522e)
![image](https://github.com/minsu0717/ts-thread/assets/96038772/40271d0b-e934-460d-abb7-71c5fcae3e3f)

- path parameter로 id 받아서 내용 변경

<h2>⭐ thread 삭제 API</h2>

![image](https://github.com/minsu0717/ts-thread/assets/96038772/c2263341-83b2-4e1e-8c09-5500230237ea)
![image](https://github.com/minsu0717/ts-thread/assets/96038772/754af37b-65ec-4ffd-8369-6ca1d924d431)

- path parameter로 id 받아서 삭제

<h2>⭐ thread 좋아요 / 삭제 API</h2>

![image](https://github.com/minsu0717/ts-thread/assets/96038772/8bd42f64-6fd4-4896-ade0-f0ea8974cc52)
![image](https://github.com/minsu0717/ts-thread/assets/96038772/a8267ad6-fc11-4594-b275-486320d49664)

- path parameter로 id 받아서 좋아요 추가/ 삭제
