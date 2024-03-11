package com.example.demo;

import com.example.demo.domain.Greeting;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class XkcdComic {
    private String month;
    private int num;
    private String link;
    private String year;
    private String news;
    private String safe_title;
    private String transcript;
    private String alt;
    private String img;
    private String title;
    private String day;
}

@RestController
@RequestMapping("/xkcd")
public class Hello {

    @GetMapping("/hello")
    public String Hello(){
        return "hello";
    }

    private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/greeting")
	public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}
    @GetMapping("/greeting2/{name}")
	public Greeting greetingPath(@PathVariable String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}

    @GetMapping("/current")
    public XkcdComic xkcdComic(){
        RestTemplate restTemplate = new RestTemplate();
        XkcdComic result = restTemplate.getForObject("https://xkcd.com/info.0.json", XkcdComic.class);
        return result;
    }

    @GetMapping("/old/{comicNumber}")
    public XkcdComic xkcdComicPast(@PathVariable String comicNumber){
        RestTemplate restTemplate = new RestTemplate();
        XkcdComic result = restTemplate.getForObject("https://xkcd.com/" + comicNumber + "/info.0.json", XkcdComic.class);
        return result;
    }
}