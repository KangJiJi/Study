# Create VM Instance(GCP를 이용한 VM Instance 대여)

## GCP

&nbsp;GCP는 Google Cloud Platform의 약자로 구글에서 서비스하는 클라우드 서비스 플렛폼이다. VM(Virtual Machine)을 대여해서 WS나 WAS로 사용할 수 있다.

## Create Project and Instance

&nbsp;구글을 가입하고 [GCP 홈페이지](https://cloud.google.com/?hl=ko)로 들어가서 [Compute Engine 제품](https://cloud.google.com/compute?hl=ko#benefits)을 선택하고 Console로 들어가서 새로운 프로젝트를 만들 수 있다.

<center><img src="https://user-images.githubusercontent.com/22635168/83936833-40df5300-a802-11ea-90c1-08f7a57f1f21.png" width="500" height="auto"></center>

프로젝트를 만들고 새 VM 인스턴스를 만들 수 있다. 머신의 구성은 상황에 맞게 설정하고 `Ubuntu 20.04 LTS`를 사용한다.

<center><img src="https://user-images.githubusercontent.com/22635168/83936895-032efa00-a803-11ea-9b8f-44763cf2db58.png"></center>

## SSH(Secure SHell) 접속

&nbsp;GCP에서는 브라우저에서 바로 SSH 접속할 수 있다. 하지만 로컬에서 접속하기 위해서는 SSH 키를 만들고 VM 인스턴스 메타데이터에 등록하는 과정을 거처야 한다.

## ssh-keygen

&nbsp;`ssh-keygen`을 이용하여 로컬에서 `공개 키`와 `비공개 키`를 만든다.

> ssh-keygen -t rsa -f ~/.ssh/KEYNAME -C USERNAME

- `-t rsa`: RSA방식으로 복호화
- `-f ~/.ssh/KEYNAME`: 결과물로 나오는 keyfile을 `~/.ssh/`에 `KEYNAME`으로 저장
- `-C USERNAME`: 주석을 추가(로그인 ID를 적는 것을 추천)
- `passphrase`: 키 생성 과정에서 입력하는 일종의 비밀번호

다음으로 `비공개 키`는 자신만 읽을 수 있도록 권한을 수정한다.

> chmod 400 ~/.ssh/KEYNAME

## 공개 키 GCP에 등록

&nbsp;GCP의 메타데이터 탭에서 공개 키를 복사 후 등록한다.

<center><img src="https://user-images.githubusercontent.com/22635168/83943865-4c4e7080-a83a-11ea-8168-0d268575a27a.png"></center>

## SSH 접속

&nbsp;다음 명령어로 로컬에서 GCP에서 대여한 `VM 인스턴스`에 ssh를 이용해서 접속한다.

> ssh -i ~/.ssh/KEYNAME USERNAME@IP

## 추가적으로 할일

&nbsp;`VM 인스턴스`에 접속해서 다음과 같은 일을 할 수 있다.

- 패키지 목록 갱신
- 방화벽 설정

## 패키지 목록 갱신

&nbsp;다음 명령어를 이용해서 패키지 목록 갱신 할 수 있다.

> sudo apt-get update

만약 모든 패키지를 최신 버전으로 업그레이드 하고 싶으면 다음 명령어를 사용한다.

> sudo apt-get upgrade

## 방화벽 설정

&nbsp;`Ubuntu`는 [UFW(Uncomplicated Firewall)](https://help.ubuntu.com/community/UFW)를 사용해서 방화벽 설정을 할 수 있다.

- `UFW`활성화와 비활성화

> sudo ufw enable

> sudo ufw disable

- `UFW`상태 확인

> sudo ufw status verbose

- `UFW`기본 정책(들어오는 패킷은 전부 거부, 나가는 패킷은 전부 허용) 확인 / 허용 / 차단

> sudo ufw show raw

> sudo ufw default allow

> sudo ufw default deny

- 포트 Allow / Deny

> sudo ufw allow [port]/[optional: protocol]

> sudo ufw allow 22/tcp

> sudo ufw deny 80/udp

- 규칙 확인 / 삭제

> sudo ufw status

> sudo ufw delete deny 80/tcp

- 특정 IP Allow / Deny

> sudo ufw allow from [target] to [destination] port [port number]

> sudo ufw allow from 192.168.0.1 to any port 22

> sudo ufw deny from [ip address] to [protocol] port [port number]

> sudo ufw deny from 192.168.0.1 to any port 22

## SSH MITM(man-in-the-middle) 공격

&nbsp;SSH에는 v1과 v2가 있는데 v1의 보안성을 보완해서 나온 것이 v2다. v1과 v2를 모두 지원하도록 설정된 서버에서 클라이언트가 SSH 접속을 시도할 때 중간에 누군가 강제로 SSHv1으로 연결되게끔 만드는 것이다.

<center><img src="https://user-images.githubusercontent.com/22635168/83945512-131bfd80-a846-11ea-86ec-4e5fc07c4922.png"></center>

이런 경우가 있으면 서버에서 친절하게 알려주기 때문에 다음 명령어로 해결 가능하다.

> ssh-keygen -R [IP]
