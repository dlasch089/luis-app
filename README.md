# user stories


## Add Team

As a Team Lead I want to add a team so that I can manage it

## View Team Members

As a Team Lead I want to view all members of a team so that I can add and delete them

## Add Team Member

As a Team Lead I want to add a team member so that I can include them in the upcoming assignments

## Delete Team Member

As a Team Lead I want to delete a team member so that they no longer show up in upcoming assignment creation

## View Assignments

As a Team Lead I want to see all past assignments of a team so that I can share the details with the members

## View Assignment (Share)

As a Team Lead I want to see all the details of a past assignment so that I can share it with the members

## Create Assignment

As a Team Lead I want to create a new assignment on a team so that I can assign team members to groups

## Select Members for New Assignment

As a Team Lead I want to select which members are available for a new assignment so that only those are included in the groups

## Reshuffle Assignment

As a Team Lead I want to reshuffle the pairs in a assignment so that I can make better combinations

---

# backlog

## Delete Team

## Edit Team Member




---

# DONE


## 404

As a user that is looking for something that doesn't exist I want to see a 404 page so that I know it doesn't for sure

## 500

As a user that encountered an unexpected error while using the app I want to see a nice 500 error page so that I know what happened


## Signup

As a Team Lead I want to signup so that I can start managing my teams

## Login

As a Team Lead I want to login so that I can continue managing my teams

## Homepage redirect

As a user that tries to access the / path I want to be redirected to login or teams page so that I can continue my journey


## View Teams

As a Team Lead I want to view all my teams so that I can manage each one of them



## BUG! logged in users should not be able to see login/signup pages

- STR: log in, go to /auth/login or /auth/signup
- WH: you see the form
- WSH: you should be redirected to /team
