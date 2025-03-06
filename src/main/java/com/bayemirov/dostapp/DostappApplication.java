package com.bayemirov.dostapp;

import com.bayemirov.dostapp.run.Location;
import com.bayemirov.dostapp.run.Run;
import com.bayemirov.dostapp.run.RunRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class DostappApplication {

	private static final Logger log = LoggerFactory.getLogger(DostappApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(DostappApplication.class, args);
		log.info("Started application!");
	}

	@Bean
	CommandLineRunner runner(RunRepository runRepository) {
		return args -> {
			Run run = new Run(1, "first run", LocalDateTime.now(), LocalDateTime.now().plusHours(3), 5, Location.OUTDOOR);
            runRepository.create(run);
		};
	}

}
