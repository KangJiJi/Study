# Nginx Setting(Nginx 셋팅)

## Nginx is ws

&nbsp;`Nginx`는 `Apache`와 함께 가장 많이 사용되는 `WS`의 한 종류다. `Nginx`와 `Apache`는 다음과 같은 차이점이 있다.

- `Apache`: 요청마다 스레드(Worker) 혹은 프로세스(PreFork 방식) 생성 및 처리
- `Nginx`: 요청마다 비동기 이벤트를 발생시켜 처리

## Nginx 설치

&nbsp;새 컴퓨터(Ubuntu)에 `Nginx`를 설치하기 전에 `Nginx packages repository`를 설정해야 한다.

- 의존성 설치
- 원하는 버전의 `Nginx packages`를 위한 `apt repository`설정
- 패키지 신뢰성 확인
- 키 신뢰성 확인
- `Nginx`설치

## 의존성 설치

&nbsp;`Nginx`에 필요한 의존성 설치는 다음 명령어로 할 수 있다.

> sudo apt install curl gnupg2 ca-certificates lsb-release

## `apt repository`설정

&nbsp;원하는 버전의 `Nginx`를 설치하기 위해서 `apt repository`설정을 해야한다. `Nginx`의 버전에는 `Stable`버전과 `Mainline`버전이 있으며, `Nginx`의 공식적인 입장은 다음과 같다.

<img src="https://user-images.githubusercontent.com/22635168/83970923-53957d00-a913-11ea-808f-1d1c45556e1b.png">

따라서 `Stable`버전을 위한 명령어는 다음과 같다.

> echo "deb http://nginx.org/packages/ubuntu \`lsb_release -cs\` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

그리고 'Mainline`버전을 위한 명령어는 다음과 같다.

> echo "deb http://nginx.org/packages/mainline/ubuntu \`lsb_release -cs\` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

## 패키지 신뢰성 확인

&nbsp;패키지의 신뢰성을 확인하기 위해서 공식 `Nginx signing key`를 다음 명령어로 다운받는다.

> curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -

## 키 신뢰성 확인

&nbsp;다음 명령어로 키 신뢰성을 확인한다.

> sudo apt-key fingerprint ABF5BD827BD9BF62

그리고 결과는 다음과 같아야한다.

> pub rsa2048 2011-08-19 [SC][expires: 2024-06-14]<br/>
> 573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62<br/>
> uid [ unknown] nginx signing key <signing-key@nginx.com>

## `Nginx`설치

&nbsp;다음 명령어로 `apt`패키지 목록 갱신과 다운로드한다.

> sudo apt update

> sudo apt install nginx

## `Nginx`삭제

&nbsp;다음 명령어로 `Nginx`를 삭제할 수 있다.

> sudo apt-get --purge remove nginx

> sudo rm /etc/apt/sources.list.d/nginx.list

## `Nginx`실행

&nbsp; 다음 명령어로 `Nginx`를 실행할 수 있다.

> sudo nginx

<img src="https://user-images.githubusercontent.com/22635168/83971242-5d1fe480-a915-11ea-83f8-a0ff51696e8a.png">

그리고 다음 명령어로 실행 확인을 할 수 있다.

> ps -ef | grep nginx

## 각종 명령어

Fast shutdown

> sudo nginx -s stop

Graceful shutdown

> sudo nginx -s quit

Reloading the configuration file

> sudo nginx -s relaod

Reopening the log files

> sudo nginx -s repoen

## `Nginx`설정 파일의 구조

&nbsp;`Nginx`는 설정 파일에 따라 제어되는 모듈의 모음으로 이루어져 있다. 그리고 다음과 같은 `Directive`가 있다.

- Simple directive
- Block directives

`Simple directive`는 다음과 같이 생겼다.

<img src="https://user-images.githubusercontent.com/22635168/83971849-4af37580-a918-11ea-8bb3-a73f9c1b723d.png">

그리고 `Block directives`는 다음과 같이 생겼다.

<img src="https://user-images.githubusercontent.com/22635168/83971896-78402380-a918-11ea-9cff-22d5705fa905.png">

## 기본 설정 변경

&nbsp; `/etc/nginx/nginx.conf`파일은 `Nginx`의 설정파일인데 `http` 블록에서 `/etc/nginx/conf.d/*.conf`파일들을 import하고 있다. 따라서 `conf.d/*.conf`파일들의 수정을 통해서 기본 설정을 변경할 수 있다.

`/etc/nginx/conf.d/default.conf`파일의 `location`블록을 다음과 같이 변경한다.

<img src="https://user-images.githubusercontent.com/22635168/83972080-4b404080-a919-11ea-9b80-64708abd7466.png">

그리고 다음 명령어로 `Nginx`에 새로운 설정을 적용한다.

> sudo nginx -s relaod

이제 http 요청이 들어오면 `/data/www`디렉토리에 `index.html`파일을 `Client`에게 전달해 준다. React build의 결과물로 나오는 `index.html` 파일을 `Client`에게 전달해주도록 사용할 수 있다.
