(ql:quickload :hunchentoot)

(defpackage :groundupmath
  (:use :common-lisp :hunchentoot))

(in-package :groundupmath)

;; Needed if you set :error-template-directory in the easy-acceptor
(setf hunchentoot::*show-lisp-errors-p* t)

(defvar groundupmath-server
  (make-instance 'hunchentoot:easy-acceptor
                 :document-root "."
                 :error-template-directory "static/error-templates/"
                 :access-log-destination "logs/access.log"
                 :message-log-destination "logs/error.log"
                 :port 8083))

(load "static.lisp")

(hunchentoot:start groundupmath-server)