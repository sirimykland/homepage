#!/usr/bin/perl -w
use strict;
use warnings;
use diagnostics;
use HTML::Template;
use File::Slurp;

# open the html template
my $template = HTML::Template->new(filename => 'test.tmpl');
my $title = 'Trivia';
my $head = '<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="trivia.js"></script>
    <link rel="stylesheet" href="trivia.css">';
my $content = read_file('trivia.html');

# fill in some parameters
$template->param(TITLE => $title);
$template->param(HEAD => $head);
$template->param(CONTENT => $content);
 
# send the obligatory Content-Type and print the template output
print "Content-Type: text/html\n\n", $template->output;
