# Next.js

```jsx
프로젝트 생성
npx create-next-app@latest
```

src/app/layout.js - 기본적인 웹 페이지의 골격

AppRouter 사용 흐름

/create로 접근 → src/app/create 폴더를 찾음 → create 폴더가 page.js가 있는지 확인 → create폴더가 layout.js가 있으면 결합, 없으면 부모 폴더의 layout.js에 결합

동적 라우팅

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/2fa8d908-7687-4a92-b7a8-6d5b5c047bbb)

→ read 폴더 하위에 [변수]/page.js 생성, props.params.변수 형태로 변수 값 사용

js disable → next.js가 서버 쪽에서 리액트를 실행해서 응답결과를 .next에 저장해서 응답함 → js가 아닌 html을 응답 → 검색 엔진 최적화

a태그 x, Link 태그 사용해야함

→ 컨텐츠가 바뀌는 영역이 일부이지만 전체 웹 페이지를 다시 가져온다 → 사용자 입장에선 느리고, 서비스 제공자는 돈이 많이 든다, 방문한 적이 있는 페이지를 다시 방문해도 다시 가져온다

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/aed9c971-a6cb-49c9-b54c-2e92a7d2db4e)

# Server

```jsx
npx json-server@0.17.4 --port 9999 --watch db.json
-> --watch: db.json이 변경되면 바로 서버가 재시동
```

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/529ff021-876f-4bce-864e-10bcb0aae280)

정보를 표현, 사용자와 상호작용x → Server Component로 만드는게 좋음

사용자와 상호작용o → Button만 새로운 컴포넌트로 만들어서 Client Component로 만드는게 좋음

# 기능 개발

## 글 목록 가져오기(Server Component)

→ Client component로 변경하려면 최상단에 “use client” 입력

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/df6016ed-36f6-4a4d-bfd7-34622d7d78c2)

→ 이렇게 Client component에서 useEffect로 서버와 연결하면 JS disable일 때 데이터를 받아오지 못함 + 보안 문제로 id,password 같은 데이터 사용할 수 없음

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/2f1a4158-cc69-484a-840a-6da913ec7730)

서버쪽에서 fetch메서드 실행, topic 데이터를 받아와서 글 목록을 동적으로 생성 후, 결과를 서버 쪽에 저장, 정적인 내용만 클라이언트에 전달

→ 용량이 적음, 접근하고 있는 서버가 같은 서버일 경우 빠르게 동작, 서버쪽에서 렌더링이 끝나고 데이터를 보내기 때문에 js disable해도 문제 없이 잘 보인다

## 글 읽기(Server Component)

이 페이지가 사용자와 상호작용 하는가? → NO → Server Component 로 구현

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/3db06ab4-c9c2-4272-a7be-469f1837fe3d)

## 글 생성

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/ac7c3b40-598a-4565-b4cc-cf5bca5653ba)

Next.js App router방식 사용 시, useRouter는 next/navigation에서 import해야함, router.push(); 사용

### Cache

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/81f99e46-3005-420b-83e0-3e515dcf0e8b)

Revalidating 확인해보기

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/7e441a77-5d4f-41da-bfd2-3e76bb834655)

→ cache: “no-store” 이나 next: {revalidate:0} 설정 후 router.push() 이후에 router.refresh()

## 클라이언트 컴포넌트 활용

Update, Delete 버튼을 없애기 위해 id값이 있는지 여부를 확인해야함 → 최상단의 layout.js(Server Component)에서는 useParams()를 사용할 수 없음 → 관련 Link들만 Client화 해야 함 → Control 컴포넌트로 분리 후 Control 컴포넌트를 Client화 하기

![image](https://github.com/YangHyunYong/NextJS/assets/43340172/d5199a4e-fbcc-4cf3-a1d5-91569f5b7d4f)

## 환경 변수

.env.local 파일에 API_URL 변수 생성

→ Server Component에서는 process.env.변수명 으로 사용 가능

→ Client Component에서는 보안 문제 상 안됨 → 사용하려는 변수를 NEXT*PUBLIC*변수명 으로 지정해줘야 사용 가능
