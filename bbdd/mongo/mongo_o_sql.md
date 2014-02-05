"Switching data stores: a postmodern comedy" Sarah Mei (Diaspora)

COMMENTS: very good speaker. well explained and good reasoning about why to choose SQL for social networks and how to migrate.
Diaspora (distributed social network like Facebook): Ruby on Rails + MongoDB (initially)
distributed into pods (servers with their own DB) that communicate each other through APIs.
It is said that "Social data is not relational"
but to denormalize documents of social networks we are using duplication of types. In several parts of the document we are referring to the same conceptual domain object. So, you need to use identifiers in order not to duplicate info an keep consistency, so, you need joins --> relational
She explains how they migrate from MongoDB to SQL db

https://speakerdeck.com/sarahmei/switching-data-stores-a-postmodern-comedy
http://www.sarahmei.com/blog/2013/11/11/why-you-should-never-use-mongodb/?goback=.gde_4916144_member_5807307646415446017#!
http://vimeo.com/83759692
