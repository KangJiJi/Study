# Hadoop Ecosystem

## Ubiquitous language

### ETL(Extract, Transform, Load)

&nbsp;ETL은 Extract, Transform, Load의 약자로 데이터를 추출, 변환, 적재하는 작업을 뜻한다. 여러곳에서 데이터를 추출하고, 형태에 맞게 변환하고, 적절한 곳에 적재한다.

### DL, DW, DM

&nbsp;DL, DW, DM은 각각 Data Lake, Data Warehouse, Data Mart의 약자다.

- DL(Data Lake): Bigdata를 기본 형식으로 저장하는 데이터 저장소
- DW(Data Warehouse): 구조화된 데이터 모델을 제공하는 데이터 저장소
- DM(Data Mart): 특정 목적을 위해 DW의 특정 데이터를 저장하는 데이터 저장소

## Hadoop Ecosystem의 이해

&nbsp;데이터 홍수의 시대에서 하둡은 빅데이터를 다루기 위해 가장 적절한 플랫폼이다. 앞으로 익숙해지면 좋을 것들에 대해서 정리하려고 한다.

## Hadoop

&nbsp;엔지니어 더그 커딩은 검색 라이브러리 프로젝트 Lucene를 오픈소스로 공개했다. 웹 검색엔진 프로젝트 Nutch는 Lucene의 아들 프로젝트로써 탄생했다. 웹 검색엔진을 위해서 많은 양의 데이터를 분산 병렬처리 할 필요가 생겼고, Google의 GFS(Google File System)논문과 MapReduce 알고리즘을 이용해서 개발을 했다. 그래서 Nutch의 아들 프로젝트인 Hadoop이 탄생했다. Hadoop은 빅데이터를 처리하기 위해 디자인된 3개의 컴포넌트로 이루어져 있다.

### HDFS(Hadoop Distributed File System)

&nbsp;HDFS는 저장을 위한 컴포넌트다. 가장 low level에서 실행되는 File system이며, 하드웨어에서 종류에 상관없이 실행할 수 있다. 큰 데이터를 여러 블록으로 쪼개서 저장한다. 이때 블록을 한곳에 저장하지 않고, 똑같은 블록을 여러곳(3곳, Replication)에 저장한다. 또한 Master-Slave 구조에서 자동으로 오류를 탐지(Slave가 3초마다 보내는 HeartBeat로 탐지)하고, 데이터를 복사하면서 Fault-tolerant 성질을 가진다.

### Hadoop MapReduce

&nbsp;MapReduce는 데이터를 처리하기 위한 컴포넌트다. 엄청난 크기의 데이터를 하나의 프로세스에서 처리하는 것은 매우 비효율적이다. 따라서 MapReduce는 데이터를 여러개로 나누고, 각각의 데이터를 노드가 처리하도록 한다. 이때 다음과 같은 5가지 과정을 거친다.

- Input
- Split
- Mapper phase
- Shuffle and Sort
- Reduce phase

각각의 노드들이 작업을 할 때, 마스터 노드는 이상을 감지하면 다시 작업을 할당해서 Fault-tolerant 성질을 가진다. 함수형 프로그래밍의 Map와 Reduce에서 영감을 받아서 만들어졌다.

### Hadoop YARN(Yet Another Resource Negotiator)

&nbsp;YARN은 RAM, 네트워크 대역폭, CPU 등등의 자원을 관리하기 위한 컴포넌트다. 자원관리 및 작업 스케줄링에 대한 책임을 가진다. 엄청난 크기의 데이터의 전송과 처리를 해야하기 때문에 관리를 위한 컴포넌트가 따로 있다. YARN은 다음과 같은 구성요소를 가지고 있다.

- Resource manager
- Node manager
- Application master
- Containers(물리적 자원의 모음)

그리고 위 구성요소들이 협력하는 과정은 다음과 같다.

- MapReduce를 수행하고 싶을 때 시작한다.
- Application master가 Node manager에게 Container를 요청한다.
- Node manager는 컴퓨터 자원을 할당한다.
- Node manager는 할당받은 자원을 Resource manager에게 전달한다.

## HBase

&nbsp;HBase는 실시간 읽기/쓰기 혹은 랜덤 접근을 빅데이터에서 가능하게 해주는 NoSQL 데이터베이스다. 구글의 Bigtable논문에 영감을 받아 만들어졌다. 확장성이 좋고, Table 샤딩의 자동화를 지원한다. Fault-tolerant 성질을 가지고, Java api를 통해 접근이 가능하며, 실시간 쿼리를 위한 캐시를 사용한다.

## Cassandra

&nbsp;Cassandra는 NoSQL 데이터베이스다. Masterless 구조와 낮은 지연을 보여주며, 확장성이 뛰어나고, Fault-tolerant 성질을 가지고 있다.

## Hive

&nbsp;Hive는 Hadoop에 저장된 데이터를 SQL(HQL)을 이용하여 읽고, 쓰고, 분석할 수 있게 해주는 쿼리 엔진이다. Disk 단위로 읽고쓰기 때문에 매우 큰 데이터를 처리하기에 용이하다.

## Spark

&nbsp;Spark은 Hive와 비슷한 쿼리 엔진의 역할도 가지고있는 프레임워크다. Spark은 메모리에서 데이터를 읽고쓰기 때문에 Hive에 비해서 훨씬 빠르고, 효율적이다. 하지만 매우 큰 데이터는 처리하기 힘들 수 있다. 또한 SQL뿐만 아니라 ML라이브러리, 실시간 스트리밍, 그래픽을 포함하는 등 분산환경에 저장된 데이터를 병렬처리를 통해서 분석할 수 있도록 지원한다. ETL 처리도 Spark에서 많이하는 추세다.

## Pig

&nbsp;Pig는 스크립트 언어로 이루어진 대용량 데이터 분석을 위한 플랫폼이다. Pig Latin이라는 절차형 언어를 사용한다. Pig Latin을 이용해서 데이터를 분석하고, 저장할 수 있다. Pig의 Infrastructure 계층은 Pig Latin을 MapReduce로 컴파일한다. 프로그래밍이 쉬고, 최적화가 잘 돼 있으며, 함수 생성을 통한 확장성이 용이하다.

## Mahout

&nbsp;Mahout은 ML 알고리즘을 Hadoop에서 처리할 수 있게하는 구현체다. 수학자, 통계학자, 데이터 사이언티스트가 자신의 알고리즘을 구현할 수 있는 분산 선형 대수 프레임워크다.

## Zookeeper

&nbsp;Zookeeper는 분산 어플리케이션의 동기화, 네이밍, 설정 등등을 유지하기 위한 중앙화된 서비스다. 분산 시스템간의 정보 공유나, 서버 상태 체크, 장애 대응 등등 트리 구조를 이용하여 여러 일을 수행한다. Hadoop 생태계에서 프로그램들의 마스코트는 동물인 경우가 많다. 따라서 Zookeeper(동물원 관리자)는 Hadoop 생태계를 관리하는 역할을 한다.

## Sqoop

&nbsp;Sqoop은 Hadoop과 RDB같은 데이터 사이에 형식을 변환해주는 프로그램이다. MySQL같은 DB에서 데이터들을 HDFS에 저장하고, MapReduce로 변환해서 HBase에 저장할 수 있다. HBase에 저장된 데이터를 다시 RDB에 저장하는 것도 가능하다. 현재는 더이상 업데이트 되지 않는 프로젝트다.

## Airflow

&nbsp;Airflow는 Airbnb에서 만든 Workflow 엔진이다. Python 코드로 정교한 DAG(Directed Acyclic Graph)를 구성할 수 있다. 그래서 작업들을 스케줄링하고 모니터링할 수 있다. 또한 다양한 CLI와 UI를 제공한다. 사용이 쉽고, 견고하다.

## Oozie

&nbsp;Oozie는 Hadoop의 job을 관리할 수 있는 Java Servlet 기반 Workflow 엔진이다. 파이프라인을 시각적으로 볼 수 있다. Hadoop진영에서 서포트해준다. Airflow보다는 사용하기 어렵다.

## Kafka

&nbsp;Kafka는 pub/sub 구조 고성능 분산 이벤트 스트리밍 플렛폼이다. 또한 오픈소스다. Kafka에서 말하는 주요 능력은 다음과 같다.

- High throughput: 2ms이하의 지연을 가진 Cluster를 사용해서 메시지를 전달한다.
- Scalable: 하루에 조 단위의 메시지까지 상황에 맞게 확장 및 축소할 수 있다.
- Permanent storage: 스트리밍된 데이터를 안전하게 저장할 수 있다.
- High availabilty: 물리적으로 떨어져 있는 Cluster도 연결할 수 있다.

Push / Pull 구조를 사용하여 Producer는 Push, Consumer는 Pull한다. 또한 중간에서 Broker가 관리한다. Kafka를 사용하면 데이터 흐름을 한번에 관리할 수 있어서 복잡성을 낮게 유지할 수 있다.

## Kubernetes

&nbsp;쿠버네티스는 여러개의 컨테이너를 관리하기 위한 도구다. 컨테이너의 재시작, 업데이트, 사이즈 조정 등등 여러 작업을 자동으로 할 수 있게 해준다.

## FMS(Fully Managed Service)

&nbsp;Hadoop 생태계를 직접 구성하는 것은 매우 어렵다. 엄청난 자원과 비용이 들어간다. 따라서 요즘에는 구글이나 아마존에서 제공하는 서비스들을 많이 사용한다. 물론 사용하는 만큼 돈을 지불해야한다. 그럼에도 Hadoop을 직접 서비스하는 것 보다 경제적이기 때문에 FMS를 사용한다. 대표적으로 다음과 같은 서비스가 있다.

- BigQuery: 매우 큰 데이터를 저렴하고 빠르게 처리할 수 있는 SQL DataWarehouse 서비스
- BigTable: 확장 가능한 NoSQL DB 서비스
- Functions: 이벤트가 발생했을 때 특정 함수를 실행시키는 서비스
- Pub/Sub: Kafka와 유사한 실시간 메세징 서비스(Publisher - Pub/Sub Topic - Subscriber)
- DataStudio: 다양한 소스와 데이터를 연결해서 시각화 할 수 있는 서비스(GCP에는 포함되지 않는 서비스)
- Elastic search: 확장성이 뛰어난 풀텍스트 검색 엔진
- 등등
