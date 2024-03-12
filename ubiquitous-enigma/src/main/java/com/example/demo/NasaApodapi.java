package com.example.demo;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class CustomResponse {
    /* 
     * {"copyright":"\nCarlos Taylor\n","date":"2024-02-05","explanation":" (post 1995)","hdurl":"https://apod.nasa.gov/apod/image/2402/Carina_Taylor_9714.jpg",
     * "media_type":"image","service_version":"v1","title":"In the Core of the Carina Nebula","url":"https://apod.nasa.gov/apod/image/2402/Carina_Taylor_960.jpg"}
     */
    String copyright,date,explanation,hdurl,media_type,service_version,title,url;
}


@RestController
@RequestMapping("/apicall")
@CrossOrigin(origins = "*")
public class NasaApodapi {

	@GetMapping("/fetch")
    @CrossOrigin(origins = "*")
	public ResponseEntity<?> greeting(@RequestParam(value = "date", required = false) String date,
        @RequestParam(value = "start_date", required = false) String start_date,
        @RequestParam(value = "end_date",required = false) String end_date,
        @RequestParam(value = "count",required = false) String count,
        @RequestParam(value = "thumbs",required = false) String thumbs) {

        String baseUrl = "https://api.nasa.gov/planetary/apod?api_key=A5YXyNIgauwGy1hVpYEfysl7Fhecl7HgYIuGKU6l";

        String url = baseUrl ;
        
        if (thumbs != null) {
            url += "thumbs=" + thumbs;
        }else{
            url += "&thumbs=false";
        }
        if (date != null) {
            url += "&date=" + date;
        }
        if (start_date != null) {
            url += "&start_date=" + start_date;
        }
        if (end_date != null) {
            url += "&end_date=" + end_date;
        }
        if (count != null) {
            url += "&count=" + count;
        }

        RestTemplate restTemplate = new RestTemplate();
        
        try {
            CustomResponse[] responsesArray = restTemplate.getForObject(url, CustomResponse[].class);
            List<CustomResponse> responsesList = Arrays.asList(responsesArray);
            return ResponseEntity.ok(responsesList);
        } catch (Exception e) {
            CustomResponse response = restTemplate.getForObject(url, CustomResponse.class);
            return ResponseEntity.ok(response);
        }
	}

    @GetMapping("/current")
    @CrossOrigin(origins = "*")
    public CustomResponse currentPOD(){
        RestTemplate restTemplate = new RestTemplate();
        CustomResponse result = restTemplate.getForObject("https://api.nasa.gov/planetary/apod?api_key=A5YXyNIgauwGy1hVpYEfysl7Fhecl7HgYIuGKU6l", CustomResponse.class);
        return result;
    }
}
