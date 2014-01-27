http://docs.splunk.com/Documentation/Splunk/6.0.1/admin/Whatsanapp

Apps are sets of dashboards, views and searches that you use to support a particular business need or solve a particular use case or type of problem.

Your apps might need some configuration and can be customized to suit your particular needs, but in general the content is designed to work "out of the box" with a prescribed configuration or type of data. Examples of apps include the Splunk App for Enterprise Security, Splunk App for VMware, the Splunk Deployment Monitor App, and the Splunk App for Microsoft Exchange.

When you're using Splunk, you're almost always using an app; we typically refer to that as being "in" an app. The default app is the Search app.

Add-ons are data feeds, modular inputs, scripts, or other mechanism for data collection. In addition, a knowledge layer (tags, event types, field extractions, lookups) lets you collect data and normalize it for use in Splunk apps and add-ons.

With apps and add-ons you can build different environments that sit on top of a single Splunk instance.

You can create separate interfaces for the different communities of Splunk users within your organization. For example, on one Splunk instance, you might have the following:

An app for troubleshooting email servers for Web analysis.
An add-on that connects a lookup table for the frontline support team to use.
This way, everyone can use the same Splunk instance, but see only data and tools that are relevant to their interests.
