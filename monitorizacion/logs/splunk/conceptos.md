http://docs.splunk.com/Documentation/UnixApp/latest/User/NewtoSplunk


##Splunk and Splunk apps work together.
The key points to come away with are:

All Splunk apps run on the Splunk platform.
Understanding how Splunk works will greatly help you understand how Splunk apps work.
Installing and configuring the app is only part of the experience - you might need to prepare Splunk before installing your app.
Careful planning helps achieve a successful app deployment experience.


## Splunk basics
Splunk is a software platform that accepts data from many different sources, such as files or network streams. Splunk stores a unique copy of this data in what's called an index. Once the data is there, you can connect to Splunk with your web browser and run searches across that data. You can even make reports or graphs on the data, right from within the browser.

You can extend Splunk's capability by installing apps. Splunk apps come with searches, reports, and graphs about specific products that are common to most IT departments. These searches, reports, and graphs reduce the amount of time it takes to glean real value from installing and running the Splunk platform.

Before you can really understand how Splunk apps work, you should understand how Splunk works. Fortunately, we've got you covered in that respect.

If you're new to Splunk, then the best place to learn more about it is in the Splunk Tutorial. It helps you learn what Splunk is and what it does, as well as what you need to run it and get step-by-step walk-throughs on how to set it up, get data into it, search with it, and create reports and dashboards on it.



##Licensing
The next thing you want to learn about is Splunk's licensing model. Splunk charges you based on the amount of data you index. The licensing introduction from the Admin Manual is a great place to start learning about how licenses work. You can also find out the types of licenses that are available, how to install, remove, and manage them, and what happens when you go over your license quota.

In the context of Splunk apps, the amount of licensing capacity you need depends on how each app defines the individual data inputs that it uses. Splunk apps use inputs to tell Splunk what data it needs to collect for the app's purpose. Some apps, such as the Splunk App for Enterprise Security, collect a lot of data, which your license must cover in order for you to be able to search that data without interruption. When planning for your app, make sure you include enough licensing capacity.



##Configuration
Much of Splunk's extensibility is in how configurable it is. You must configure Splunk before it can collect data and extract knowledge. All Splunk apps use configuration files to determine how to collect, transform, display, and provide alerts for data. The Admin Manual shows you how to configure those files and includes a reference topic for each configuration file that Splunk uses. In some cases, you can also use Splunk Web or the CLI to make changes to a Splunk app's configuration.

Splunk also uses configuration files to configure itself. When Splunk initializes, it finds all of the configuration files located in the Splunk directory and merges them to build a final "master" configuration, which it then runs on. When you install a Splunk app on a Splunk instance, Splunk must determine which configuration files to use if it encounters a conflict. This is where configuration file precedence comes in.

It's important to understand how precedence works. In many cases, if there is a configuration file conflict, Splunk gives priority to an app's configuration file. In some situations, installing an app might inadvertently override a setting in a configuration file in the core platform, which might lead to undesired results in data collection. Be sure to read the previously mentioned topic thoroughly for details.



## Splunk Search
Splunk provides the ability to look through all the data it indexes and create dashboards, reports, and even alerts. All Splunk apps rely on Splunk search, so it's a good idea to read the Search Manual's overview on search to learn how powerful Splunk's search engine is (the Tutorial is also a good place to learn about Splunk search.)

You should also have an understanding of Splunk's search language. Splunk apps use the search language extensively to put together search results and knowledge objects which drive their dashboards, reports, charts, and tables.

Finally, it's a good idea to familiarize yourself with the search commands in the Search Reference Manual. That manual describes the commands that both Splunk and your Splunk app can use.



## Sources and source types
When Splunk indexes data, it does so from a source - an entity that provides data for Splunk to extract, for example, Windows event logs, or *nix syslogs. Splunk tags incoming data with a "source" field as it gets indexed. The source type is an indicator for the type of data, so that Splunk knows how to properly format and extract it as it comes in. It's also - conveniently enough - a way to categorize data, as you can use Splunk search to display all data of a certain source type.

Splunk apps use sources and source types to extract knowledge from the data they index. Many views in an application depend on searches with specific sources and source types defined in them. Splunk apps sometimes use the source types that come with Splunk, and sometimes they define their own.



## Capacity planning and distributed Splunk
Another important factor to consider when using a Splunk app: Do you have enough hardware to realistically support a deployment for the Splunk app you're using? Read our capacity planning documentation for a head-start on ensuring you have the machinery in place to run your Splunk app deployment at peak performance.

Learning about capacity planning is a perfect time to introduce another concept with which you should be familiar: distributed search. Nearly every Splunk app available can use distributed search, and many were developed with distributed search in mind. What this means is that you must working with multiple Splunk instances at once - with each instance playing a specific role - to use the app to its full potential. Initially, you add indexers to increase indexing performance, then you add search heads to increase search performance. The Distributed Deployment Manual provides details on how to add more Splunk instances to keep up with your app's performance demands.



## What's next?
From this point, you are ready to plan your app deployment. Continue reading for information about how this app fits into the Splunk picture, platform and hardware requirements, and other deployment considerations.Splunk and Splunk apps work together.
The key points to come away with are:

All Splunk apps run on the Splunk platform.
Understanding how Splunk works will greatly help you understand how Splunk apps work.
Installing and configuring the app is only part of the experience - you might need to prepare Splunk before installing your app.
Careful planning helps achieve a successful app deployment experience.
Splunk basics
Splunk is a software platform that accepts data from many different sources, such as files or network streams. Splunk stores a unique copy of this data in what's called an index. Once the data is there, you can connect to Splunk with your web browser and run searches across that data. You can even make reports or graphs on the data, right from within the browser.

You can extend Splunk's capability by installing apps. Splunk apps come with searches, reports, and graphs about specific products that are common to most IT departments. These searches, reports, and graphs reduce the amount of time it takes to glean real value from installing and running the Splunk platform.

Before you can really understand how Splunk apps work, you should understand how Splunk works. Fortunately, we've got you covered in that respect.

If you're new to Splunk, then the best place to learn more about it is in the Splunk Tutorial. It helps you learn what Splunk is and what it does, as well as what you need to run it and get step-by-step walk-throughs on how to set it up, get data into it, search with it, and create reports and dashboards on it.

Licensing
The next thing you want to learn about is Splunk's licensing model. Splunk charges you based on the amount of data you index. The licensing introduction from the Admin Manual is a great place to start learning about how licenses work. You can also find out the types of licenses that are available, how to install, remove, and manage them, and what happens when you go over your license quota.

In the context of Splunk apps, the amount of licensing capacity you need depends on how each app defines the individual data inputs that it uses. Splunk apps use inputs to tell Splunk what data it needs to collect for the app's purpose. Some apps, such as the Splunk App for Enterprise Security, collect a lot of data, which your license must cover in order for you to be able to search that data without interruption. When planning for your app, make sure you include enough licensing capacity.

Configuration
Much of Splunk's extensibility is in how configurable it is. You must configure Splunk before it can collect data and extract knowledge. All Splunk apps use configuration files to determine how to collect, transform, display, and provide alerts for data. The Admin Manual shows you how to configure those files and includes a reference topic for each configuration file that Splunk uses. In some cases, you can also use Splunk Web or the CLI to make changes to a Splunk app's configuration.

Splunk also uses configuration files to configure itself. When Splunk initializes, it finds all of the configuration files located in the Splunk directory and merges them to build a final "master" configuration, which it then runs on. When you install a Splunk app on a Splunk instance, Splunk must determine which configuration files to use if it encounters a conflict. This is where configuration file precedence comes in.

It's important to understand how precedence works. In many cases, if there is a configuration file conflict, Splunk gives priority to an app's configuration file. In some situations, installing an app might inadvertently override a setting in a configuration file in the core platform, which might lead to undesired results in data collection. Be sure to read the previously mentioned topic thoroughly for details.

Splunk Search
Splunk provides the ability to look through all the data it indexes and create dashboards, reports, and even alerts. All Splunk apps rely on Splunk search, so it's a good idea to read the Search Manual's overview on search to learn how powerful Splunk's search engine is (the Tutorial is also a good place to learn about Splunk search.)

You should also have an understanding of Splunk's search language. Splunk apps use the search language extensively to put together search results and knowledge objects which drive their dashboards, reports, charts, and tables.

Finally, it's a good idea to familiarize yourself with the search commands in the Search Reference Manual. That manual describes the commands that both Splunk and your Splunk app can use.

Sources and source types
When Splunk indexes data, it does so from a source - an entity that provides data for Splunk to extract, for example, Windows event logs, or *nix syslogs. Splunk tags incoming data with a "source" field as it gets indexed. The source type is an indicator for the type of data, so that Splunk knows how to properly format and extract it as it comes in. It's also - conveniently enough - a way to categorize data, as you can use Splunk search to display all data of a certain source type.

Splunk apps use sources and source types to extract knowledge from the data they index. Many views in an application depend on searches with specific sources and source types defined in them. Splunk apps sometimes use the source types that come with Splunk, and sometimes they define their own.

Capacity planning and distributed Splunk
Another important factor to consider when using a Splunk app: Do you have enough hardware to realistically support a deployment for the Splunk app you're using? Read our capacity planning documentation for a head-start on ensuring you have the machinery in place to run your Splunk app deployment at peak performance.

Learning about capacity planning is a perfect time to introduce another concept with which you should be familiar: distributed search. Nearly every Splunk app available can use distributed search, and many were developed with distributed search in mind. What this means is that you must working with multiple Splunk instances at once - with each instance playing a specific role - to use the app to its full potential. Initially, you add indexers to increase indexing performance, then you add search heads to increase search performance. The Distributed Deployment Manual provides details on how to add more Splunk instances to keep up with your app's performance demands.

What's next?
From this point, you are ready to plan your app deployment. Continue reading for information about how this app fits into the Splunk picture, platform and hardware requirements, and other deployment considerations.
