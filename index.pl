#!/usr/bin/perl -w
use strict;
use warnings;
use diagnostics;
use HTML::Template;
use File::Slurp;

# open the html template
my $template = HTML::Template->new(filename => 'test.tmpl');
my $title = 'Are you Siriuss?';
my $content = read_file('home.html');

# fill in some parameters
$template->param(TITLE => $title);
$template->param(CONTENT => $content);
 
# send the obligatory Content-Type and print the template output
print "Content-Type: text/html\n\n", $template->output;
