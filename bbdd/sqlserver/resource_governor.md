# Resource Governor
https://www.sqlshack.com/sql-server-2014-resource-governor/

There are three main components that form the Resource Governor; Resource Pools, Workload Groups and the Classifier. Small chunks of the CPU, Memory and IOPS resources are collectively called the Resource Pool. A set of defined connections is known as Workload Group. The component that is responsible for classifying incoming connections to workload groups, depending predefined criteria, is called the Classifier. We will review each these components, in detail, in this article.


# CPU
Resource Pools represent virtual instances of all of the available SQL Server CPU, Memory and IOPS resources. There are two built-in resource pools created when you install the SQL Server; the Internal Pool, which is used for the SQL Server background tasks, and the Default Pool, which is used to serve all user connections that are not directed to any user-defined resource pool.
