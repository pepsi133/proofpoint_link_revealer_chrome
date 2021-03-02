VERSION := $(shell cat VERSION)
PACKAGE := proofpoint_url_revealer_gmail

ZIP := $(PACKAGE)-$(VERSION).zip

DEPS := css fonts js LICENSE background.js manifest.json options.html
FILES := $(shell find $(DEPS) -type f -print)

all: out/$(ZIP)

out/$(ZIP): $(FILES)
	zip out/$(ZIP) $(FILES)

clean:
	rm -f out/*
