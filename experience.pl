#!/usr/bin/perl -w
use strict;
use warnings;
use diagnostics;
use HTML::Template;
use File::Slurp;

# open the html template
my $template = HTML::Template->new(filename => './global/test.tmpl');
my $title = 'My experience';
my $headsource ='<link rel="stylesheet" type="text/css" href="./experience.css">';
my $content = HTML::Template->new(filename => './experience.html');
my @experience_list = [
    {
        name => 'DEVELOPMENT', 
        description => 'I have experience building fullstack applications using
                        Java, Kotlin, Spring, GraphQL, React, Typescript, JavaScript, Apollo, Node, 
                        Redux, Python w/ Flask, Perl etc.',
        icon => "fas fa-globe",
        color => 'color-1'
    },{
        name => 'DATA STRUCTURES & ALGORITHMS', 
        description => 'Coming from the CS background, I have good grasp over 
                        fundamental concepts of Data Structures and Algorithms.',
        icon => "fa fa-braille",
        color => 'color-2'
    },{
        name => 'DATABASES', 
        description => 'I have experience with PostgreSQL and Firebase real-time DB.',
        icon => "fas fa-database",
        color => 'color-3'
    },{
        name => 'DEV OPS', 
        description => "During my internships I've worked with Gradle, Openshift, Jenkins, CircleCI,
                        and Docker.",
        icon => "fas fa-database",
        color => 'color-4'
    },{
        name => 'GIT CLIENTS', 
        description => 'I have worked with Git, GitHub Desktop and Bitbucket.',
        icon => "fab fa-git-square",
        color => 'color-5'
    },{
        name => 'COLLABOARTION TOOLS', 
        description => 'During internships, group projects, and my experience from ITK I have used 
                        IRC, Mattermost, Slack, Jira, Trello, Teams, Zoom, and GSuite.',
        icon => "far fa-comments",
        color => 'color-6'
    },{
        name => 'GAME DEVELOPMENT', 
        description => "I have gaind experience in game development for Android and VR. 
                        For VR development, I have been using Unity to create 
                        3D environments, C# to provide the game functionality. 
                        For Android development, I've worked in Android Studios with Kotlin and LibGDX.",
        icon => "fa fa-gamepad",
        color => 'color-1'
    },{
        name => 'EDITORS', 
        description => 'Through the years I have been using Vim, IntelliJ Ultimate, Eclipse, 
                        Visual Studio Code, Visual Studio, Android Studio to name a few.',
        icon => "far fa-file-code",
        color => 'color-2'
    }];



# fill in some parameters
$content->param(EXPERIENCE => @experience_list);
$template->param(TITLE => $title);
$template->param(HEAD=>$headsource);
$template->param(CONTENT => $content->output);
#$template->param( EXPERIENCE => @experience_list); 
# send the obligatory Content-Type and print the template output
print "Content-Type: text/html\n\n", $template->output;
