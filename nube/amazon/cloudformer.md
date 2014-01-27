http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-cloudformer.html

CloudFormer is a tool that creates an AWS CloudFormation template from existing AWS resources in your account. The basic procedure is:

Provision and configure the required resources using your existing processes and tools.

Create and launch a CloudFormer stack.

CloudFormer is itself an AWS CloudFormation stack. You run CloudFormer by launching the stack from your AWS environment. It runs on a t1.micro Amazon EC2 instance and requires no other resources.

Use CloudFormer to create a template using any of your existing AWS resources and save it to an Amazon S3 bucket.

Shut down the CloudFormer stack.

You usually don't need CloudFormer beyond this point, so you can avoid additional charges by shutting it down, which terminates the associated Amazon EC2 instance.

Use the template to launch the stack, as needed.

