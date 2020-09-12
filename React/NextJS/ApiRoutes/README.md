# API Routes

## Creating API Routes

&nbsp;`pages/api`에 함수를 만들어서 `Next.js`앱의 `API endpoint`를 만들 수 있다. 그리고 `http://localhost:3000/api/hello`에 접속해서 확인할 수 있다.

```javascript
// pages/api/hello.js
export default (req, res) => {
  res.status(200).json({ text: "Hello" });
};
```

그리고 `getStaticProps`, `getStaticPaths`에서 `API Route`를 사용하면 안된다. 대신에 `Server-Side`코드를 작성해야 한다. 왜냐하면 `getStaticProps`, `getStaticPaths`는 서버에서만 실행되기 때문에 클라이언트에서는 절대 실행되지 않는다. 직접적으로 DB에 접근하는 코드는 괜찮다는 것을 의미하기도 한다.
