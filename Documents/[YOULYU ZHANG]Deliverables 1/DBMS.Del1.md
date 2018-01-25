# Data
### Tables Structure
- paper
  - title (CLOB)
  - year (NUMBER(10, 0))
  - conference (CLOB)
  - paper_key (VARCHAR2(200))
- citation
  - paper_cite_key (VARCHAR2(200))
  - paper_cited_key (VARCHAR2(200))
- conference
  - conf_key (VARCHAR2(100))
  - name (CLOB)
  - detail (CLOB)
- author
  - name (VARCHAR2(100))
  - paper_key (VARCHAR2(200))

Database structure may be modified later.

### Question Specific

##### What are the main functions that the web-based user interface should provide?
The user of our application will be able to access information about following.
1. information about a specific author, conference, and paper.
1. connection between paper and author.
1. trend of activity of a specific author.
1. trend of citation frequency of a specific paper.

Our single-page application(SAP) will also provide features of following. (All calculation will be achieved by using RDB features.)
1. graphical representation of the returned query result.
1. straightforward navigation to every feature.
1. way to compare multiple trends, such as to compare paper publication frequency over years of two author.
1. ability to add the filter to the query according to some common rules. (This feature should be achieved by automatically modify queries in the back-end, and it is meaningful because it can provide lots of usability and more insight of data.)

##### How do the different functions work together? Sometimes there are dependencies between different functions.
Front-end will be implemented by "React", back-end will be represented by "NodeJs", and the query will be sent from the back-end.

The user gives instruction by using front GUI, the instruction then send to the back-end, and then back-end sends queries to the database. The database returns the required data back to the back-end, then to the front-end, then the data will be visualized by using 3rd-party packages like Highcharts.

##### Which real world data are needed to support the functions identified before?

Data containing information about paper, citation of papers, conference and author is required.

##### Can such real world data be found in the Internet?

The data is already be retrieved from "http://dblp.org" and is inserted into the database. DBLP is a computer science bibliography website.

##### What (colloquial) queries are important for the application?
Example queries:
1. find all connection form and to a specific paper. (This query is meaningful because it can list titles that are relevant to the selected paper.)
1. find all papers that are becoming more popular over time and papers that are become less popular, by analysis trend of citation. (This query is meaningful because it can tell currently popular papers.)
1. find the conference that researcher of a specific sub-topic most frequently attends. (e.g. Which conference I should go if I'm interested in cryptography)

##### Which public domain and/or proprietary software is needed to perform the task? (The database system used must be CISE Oracle.)
