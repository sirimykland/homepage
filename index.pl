#!/usr/bin/perl -w
use HTML::Template;
 
# open the html template
my $template = HTML::Template->new(filename => 'test.tmpl');

# fill in some parameters
#$template->param(CONTAINER => 'container.txt');
 
# send the obligatory Content-Type and print the template output
print "Content-Type: text/html\n\n", $template->output;
