[1mdiff --git a/src/components/EmptySectionText.css b/src/components/EmptySectionText.css[m
[1mindex 4b139cc..f79037a 100644[m
[1m--- a/src/components/EmptySectionText.css[m
[1m+++ b/src/components/EmptySectionText.css[m
[36m@@ -16,4 +16,14 @@[m
     line-height: 22px;[m
     color: #8c8c8c;[m
     margin: 0;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.fadeOut {[m
[32m+[m[32m    opacity: 0;[m
[32m+[m[32m    transition: opacity 0s;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.fadeIn {[m
[32m+[m[32m    opacity: 1;[m
[32m+[m[32m    transition: opacity 10s;[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/src/components/EmptySectionText.tsx b/src/components/EmptySectionText.tsx[m
[1mindex 3534a8f..feb9df9 100644[m
[1m--- a/src/components/EmptySectionText.tsx[m
[1m+++ b/src/components/EmptySectionText.tsx[m
[36m@@ -8,7 +8,7 @@[m [minterface EmptySectionTextProps {[m
 [m
 const EmptySectionText: React.FC<EmptySectionTextProps> = ({mainText, subText}) => {[m
   return ([m
[31m-    <div className="textContainer">[m
[32m+[m[32m    <div className="textContainer fadeIn">[m
       <strong>{mainText}</strong>[m
       <p>{subText}</p>[m
     </div>[m
[1mdiff --git a/src/pages/Events.css b/src/pages/Events.css[m
[1mindex 329044e..e69de29 100644[m
[1m--- a/src/pages/Events.css[m
[1m+++ b/src/pages/Events.css[m
[36m@@ -1,9 +0,0 @@[m
[31m-.fadeOut {[m
[31m-    opacity: 0;[m
[31m-    transition: opacity 0s;[m
[31m-}[m
[31m-[m
[31m-.fadeIn {[m
[31m-    opacity: 1;[m
[31m-    transition: opacity 10s;[m
[31m-}[m
\ No newline at end of file[m
