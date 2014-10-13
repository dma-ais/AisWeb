Format: 1.52

# This is the Natural Docs languages file for this project.  If you change
# anything here, it will apply to THIS PROJECT ONLY.  If you'd like to change
# something for all your projects, edit the Languages.txt in Natural Docs'
# Config directory instead.


# You can prevent certain file extensions from being scanned like this:
# Ignore Extensions: [extension] [extension] ...


#-------------------------------------------------------------------------------
# SYNTAX:
#
# Unlike other Natural Docs configuration files, in this file all comments
# MUST be alone on a line.  Some languages deal with the # character, so you
# cannot put comments on the same line as content.
#
# Also, all lists are separated with spaces, not commas, again because some
# languages may need to use them.
#
# Language: [name]
# Alter Language: [name]
#    Defines a new language or alters an existing one.  Its name can use any
#    characters.  If any of the properties below have an add/replace form, you
#    must use that when using Alter Language.
#
#    The language Shebang Script is special.  It's entry is only used for
#    extensions, and files with those extensions have their shebang (#!) lines
#    read to determine the real language of the file.  Extensionless files are
#    always treated this way.
#
#    The language Text File is also special.  It's treated as one big comment
#    so you can put Natural Docs content in them without special symbols.  Also,
#    if you don't specify a package separator, ignored prefixes, or enum value
#    behavior, it will copy those settings from the language that is used most
#    in the source tree.
#
# Extensions: [extension] [extension] 