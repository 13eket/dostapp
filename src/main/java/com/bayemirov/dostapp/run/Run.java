package com.bayemirov.dostapp.run;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record Run(
        @Id
        Integer id,
        String title,
        LocalDateTime startedOn,
        LocalDateTime completedOn,
        Integer kilometers,
        Location location
) {}
