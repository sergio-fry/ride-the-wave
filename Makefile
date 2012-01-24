SHELL := /bin/bash
 
test:
	node_modules/expresso/bin/expresso test/**/*
	   
.PHONY: test
