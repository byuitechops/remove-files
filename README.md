# Remove Files
### *Package Name*: remove-files
### *Type*: Shell Module (Cleanup)
### *Platform*: All
### *Required*: Required

## Purpose

This module removes all generated and downloaded files from the conversion tool once the process is complete.

## How to Install

```
npm install remove-files
```

## Run Requirements

This should always run last, if possible, so it doesn't delete needed files.

## Options
No options available.

## Outputs

None

## Process

Describe in steps how the module accomplishes its goals.

1. Gathers locations from `course.info`
2. Deletes the file(s) at the given location

## Log Categoriesa

None

## Requirements

Must delete:
- The downloaded zip file
- The unzipped course folder
- The newly written course folder
- The newly zipped file