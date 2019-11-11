#!/usr/bin/perl -w
use HTML::Template;
use File::Slurp;

# open the html template
my $template = HTML::Template->new(filename => 'test.tmpl');
my $title = 'My experience';
my $content = HTML::Template->new(filename => 'experience.html');
my @experience_list = [
    {
        name => 'WEB DEVELOPMENT', 
        description => 'I have experience building websites using JavaScript,
        React, HTML, CSS.',
        icon => "icon-world",
        color => 'color-1'
    },{
        name => 'DATA STRUCTURES & ALGORITHMS', 
        description => 'Coming from the CS background, I have good grasp over 
                        fundamental concepts of Data Structures and Algorithms.',
        icon => "fa fa-braille",
        color => 'color-2'
    },{
        name => 'DATABASES', 
        description => 'I have experience with MySQL and PostgreSQL.',
        icon => "icon-data",
        color => 'color-3'
    },{
        name => 'DEV OPS', 
        description => 'During my internship with Systek at Skatteetaten 
                        we used Openshift and worked with tools like Jenkins, 
                        and touched on the concepts of Kubernetes and Docker.',
        icon => "icon-data",
        color => 'color-4'
    },{
        name => 'GIT CLIENTS', 
        description => 'I have worked with Git, GitHub Desktop and Bitbucket.',
        icon => "icon-git",
        color => 'color-5'
    },{
        name => 'COLLABOARTION TOOLS', 
        description => 'During the internship at Systek and Skattetaten I used 
                        both Slack and Jira.',
        icon => "far fa-comments",
        color => 'color-6'
    },{
        name => 'GAME DEVELOPMENT', 
        description => 'For game development I have been using Unity to create 
                        3D environments, C# to provide game objects with properties 
                        and features, and the HTC Vive as VR game equipment.',
        icon => "fa fa-gamepad",
        color => 'color-1'
    },{
        name => 'COLLABOARTION TOOLS', 
        description => 'Through the years I have been using Vim, Atom, Sublime, 
                        IntelliJ IDEA, Eclipse, Visual Studio Code, Visual Studio.',
        icon => "far fa-file-code",
        color => 'color-2'
    }];



# fill in some parameters
$content->param(EXPERIENCE => @experience_list);
$template->param(TITLE => $title);
$template->param(CONTENT => $content->output);
#$template->param( EXPERIENCE => @experience_list); 
# send the obligatory Content-Type and print the template output
print "Content-Type: text/html\n\n", $template->output;
