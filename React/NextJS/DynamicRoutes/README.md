# Dynamic Routes

## Page Path Depends on External Data

&nbsp;`getStaticProps`함수를 이용해 page 랜더링에 필요한 데이터를 fetch했다. `Next.js`는 외부 데이터에 의존하는 페이지를 정적으로 만들 수 있다. 이는 `Dynamic URL`을 `Next.js`에서 사용할 수 있는 것을 의미한다.

## How to Statically Generate Pages with Dynamic Routes

&nbsp;`Dynamic Routes`로 요청된 웹 페이지가 생성되는 과정은 다음과 같다.

- `url/posts/<id>` 요청
- `/pages/posts/[js].js` 파일을 가지고 페이지를 생성
  - React가 페이지를 랜더링
  - `getStaticPaths`가 URL이 될 수 있는 모든 `id`값을 반환
  - `getStaticProps`가 `id`값에 따라 적절한 값을 `fetch`

## Implement getStaticPaths

&nbsp;`getStaticPaths`가 반환하는 값은 다음과 같은 형식이여야 한다.

```json
{ params: { id: ... } }
```

`getStaticPaths`가 반환한 값 중 URL에 매치가 되는 값을 `getStaticProps`의 인자로 넘긴다. 넘어온 `id`값을 이용해서 `Dynamic Routes`기능을 수행한다.

```javascript
// /pages/posts/[id].js

...

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    // Fallback은 paths 페이지가 없을 때 처리방법(404 표시)
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

또한 `getStaticPaths`도 개발모드와 배포했을 때 동작의 차이가 있다.

- 개발모드에서는 매번 요청마다 `getStaticPaths`함수 실행
- 배포했을 때는 빌드 시점에 한번 `getStaticPaths`함수 실행
