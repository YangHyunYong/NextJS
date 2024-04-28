# Next.js

```jsx
프로젝트 생성
npx create-next-app@latest
```

src/app/layout.js - 기본적인 웹 페이지의 골격

AppRouter 사용 흐름

/create로 접근 → src/app/create 폴더를 찾음 → create 폴더가 page.js가 있는지 확인 → create폴더가 layout.js가 있으면 결합, 없으면 부모 폴더의 layout.js에 결합

동적 라우팅

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/14d750dd-52d9-46a6-9b79-58e6c84469f6/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/be5bdaa2-491a-4713-a710-e1fdad1544a7/Untitled.png)

→ read 폴더 하위에 [변수]/page.js 생성, props.params.변수 형태로 변수 값 사용

js disable → next.js가 서버 쪽에서 리액트를 실행해서 응답결과를 .next에 저장해서 응답함 → js가 아닌 html을 응답 → 검색 엔진 최적화

a태그 x, Link 태그 사용해야함

→ 컨텐츠가 바뀌는 영역이 일부이지만 전체 웹 페이지를 다시 가져온다 → 사용자 입장에선 느리고, 서비스 제공자는 돈이 많이 든다, 방문한 적이 있는 페이지를 다시 방문해도 다시 가져온다

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/1cd727ff-eac3-4b0d-bf73-84adc5422b68/Untitled.png)

# Server

```jsx
npx json-server@0.17.4 --port 9999 --watch db.json
-> --watch: db.json이 변경되면 바로 서버가 재시동
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/a6377ba8-5c8c-4c3a-ad20-3c862c7f9e83/Untitled.png)

정보를 표현, 사용자와 상호작용x → Server Component로 만드는게 좋음

사용자와 상호작용o → Button만 새로운 컴포넌트로 만들어서 Client Component로 만드는게 좋음

# 기능 개발

## 글 목록 가져오기(Server Component)

→ Client component로 변경하려면 최상단에 “use client” 입력

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/2add07f8-e6c6-400d-8668-e8deb5c9bfd8/Untitled.png)

→ 이렇게 Client component에서 useEffect로 서버와 연결하면 JS disable일 때 데이터를 받아오지 못함 + 보안 문제로 id,password 같은 데이터 사용할 수 없음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/e8b5084d-e7c8-4e56-a18c-9484fcfd5560/Untitled.png)

서버쪽에서 fetch메서드 실행, topic 데이터를 받아와서 글 목록을 동적으로 생성 후, 결과를 서버 쪽에 저장, 정적인 내용만 클라이언트에 전달

→ 용량이 적음, 접근하고 있는 서버가 같은 서버일 경우 빠르게 동작, 서버쪽에서 렌더링이 끝나고 데이터를 보내기 때문에 js disable해도 문제 없이 잘 보인다

## 글 읽기(Server Component)

이 페이지가 사용자와 상호작용 하는가? → NO → Server Component 로 구현

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/1608e9bb-0f80-443a-87ff-01702762f835/Untitled.png)

## 글 생성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/b1f36103-38f2-448f-acf9-4d113230787c/Untitled.png)

Next.js App router방식 사용 시, useRouter는 next/navigation에서 import해야함, router.push(); 사용

### Cache

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/92a97793-f3c3-4c97-b4f8-359255c993fd/Untitled.png)

Revalidating 확인해보기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/c33baea4-0490-43e4-a888-cfa9e5f6d91e/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/a83caa3d-fa16-4276-954f-aae6b8f12d93/Untitled.png)

→ cache: “no-store” 이나 next: {revalidate:0} 설정 후 router.push() 이후에 router.refresh()

## 클라이언트 컴포넌트 활용

Update, Delete 버튼을 없애기 위해 id값이 있는지 여부를 확인해야함 → 최상단의 layout.js(Server Component)에서는 useParams()를 사용할 수 없음 → 관련 Link들만 Client화 해야 함 → Control 컴포넌트로 분리 후 Control 컴포넌트를 Client화 하기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c120b5b-7099-47a2-b596-5d25adf65ec9/96df94be-1c43-4d16-95e1-8d6e422f882d/Untitled.png)

## 환경 변수

.env.local 파일에 API_URL 변수 생성

→ Server Component에서는 process.env.변수명 으로 사용 가능

→ Client Component에서는 보안 문제 상 안됨 → 사용하려는 변수를 NEXT*PUBLIC*변수명 으로 지정해줘야 사용 가능
