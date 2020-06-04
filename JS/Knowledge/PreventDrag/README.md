# Prevent drag(드래그 방지)

## Not about drag event

&nbsp;일반적인 페이지가 아닌 재미있거나 신기한(?) 웹 애플리케이션(구글 드라이브 등등)을 만들다 보면 사용자가 화면에서 문자를 드래그하는 것을 막아야 하는 경우가 있다. 또한 특정 글에서도 이미지를 쉽게 복사하는 행위를 막고 싶을 수 있다.

![드래그의 문제점](https://user-images.githubusercontent.com/22635168/83771084-da045180-a6bc-11ea-81a1-8070bd15e1b3.gif)

> 파란색으로 focus되는게 예쁘지 않다.

## 문자가 드래그 되는 것을 막자!

&nbsp;CSS의 `user-select`를 사용해서 문자 드래그를 막을 수 있다.

```HTML
<head>
  <meta charset="utf-8" />
  <style type="text/css">
    .no-drag {
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }
  </style>
</head>
<body>
  <div>
    <p>드래그 됨</p>
    <p>드래그 됨</p>
    <p class="no-drag">드래그 안됨</p>
    <p>드래그 됨</p>
    <p>드래그 됨</p>
  </div>
</body>
```

하지만 드래그 할 수 있는 문자에서 시작하면 드래그가 된다는 문제점이 있다(IE 에서 문제 발생).

![이상한 버그](https://user-images.githubusercontent.com/22635168/83771129-edafb800-a6bc-11ea-834c-2699d9c1000d.gif)

그래서 위와같은 문제점을 해결하기 위해서 모든 태그에 `no-drag`클래스를 적용하거나 `<body>`태그에 `no-drag`클래스를 적용해주면 된다.

```HTML
<body class="no-drag"></body>
```

혹은 `<body>`태그에 `ondragstart`와 `onselectstart`이벤트에 `return false`를 입력해도 된다.

```HTML
<body ondragstart="return false" onselectstart="return false"></body>
```

## 이미지가 드래그 되거나 우클릭을 막자!

&nbsp;이미지의 드래그나 우클릭을 막기 위해서는 `user-select`와 함께 `oncontextmenu`와 `draggable`속성을 이용한다.

`<img>`태그의 `draggable`로 이미지가 드래그 되는 것을 막을 수 있다.

```HTML
<head>
  <title>drag</title>
  <meta charset="utf-8" />
  <style type="text/css">
    .no-drag {
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }
  </style>
</head>
<body>
  <img class="no-drag" draggable="false" src="./test.png" />
</body>
```

또한 `oncontextmenu`로 마우스 우클릭을 막을 수 있다.

```HTML
<img
  class="no-drag"
  oncontextmenu="return false"
  draggable="false"
  src="./test.png"
/>
```

## 결론

&nbsp;결론적으로 다음과 같은 속성으로 드래그와 우클릭을 막을 수 있다.

- `CSS`의 `user-select`
- `<img>`태그의 `draggable` 속성
- 태그의 `oncontextmenu` 속성
