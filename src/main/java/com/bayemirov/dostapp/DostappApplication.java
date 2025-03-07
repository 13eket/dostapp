package com.bayemirov.dostapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DostappApplication {

	private static final Logger log = LoggerFactory.getLogger(DostappApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(DostappApplication.class, args);
		log.info("Started application!");
	}
}
