package application;

import application.configuration.JpaConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@Import(JpaConfiguration.class)
@SpringBootApplication(scanBasePackages={"application"})
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}