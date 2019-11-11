#!/usr/bin/perl -w
use HTML::Template;
use File::Slurp;

# open the html template
my $template = HTML::Template->new(filename => 'test.tmpl');
my $title = 'My experience';
my $content = HTML::Template->new(filename => 'experience.html');
my @experience_list = [
    {name => 'Sam', 
     description => 'programmer',
     icon => "far fa-comments",
     color => 'color-2'}, 
    {name => 'Sam', 
     description => 'programmer',
     icon => "far fa-comments",
     color => 'color-3'}
    ];



# fill in some parameters
$content->param(EXPERIENCE => @experience_list);
$template->param(TITLE => $title);
$template->param(CONTENT => $content->output);
#$template->param( EXPERIENCE => @experience_list); 
# send the obligatory Content-Type and print the template output
print "Content-Type: text/html\n\n", $template->output;
