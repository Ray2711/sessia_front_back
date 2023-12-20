package com.nurique.security.blogs;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/blogs")
public class BlogController {
    private final BlogRepository customerRepository;
    
    @CrossOrigin(origins = "*")
    @GetMapping
    public List<Blog> getCustomers(){
        return customerRepository.findAll(); 
    }



    record NewCustomerRequest(
        String title,
        String created,
        String overview,
        String text
    ){}

    @CrossOrigin(origins = "*")
    @PostMapping(consumes = {"application/json"})
    public void addCustomer(@RequestBody NewCustomerRequest req){
        Blog customer = new Blog();
        customer.setTitle(req.title());
        customer.setCreated(req.created());
        customer.setOverview(req.overview());
        customer.setText(req.text());
        customerRepository.save(customer);
    }
    @CrossOrigin(origins = "*")
    @PutMapping("{customerId}")
    public void UpdateCustomer(@RequestBody NewCustomerRequest req,@PathVariable("customerId") Integer id){
        Blog customer = customerRepository.getReferenceById(id);
        customer.setTitle(req.title());
        customer.setCreated(req.created());
        customer.setOverview(req.overview());
        customer.setText(req.text());
        customerRepository.save(customer);  
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("{customerId}")
    public void deleteCustomer(@PathVariable("customerId") Integer id){
        customerRepository.deleteById(id);
    }

    //TODO FIX IT

    @CrossOrigin(origins = "*")
    @GetMapping("{id}")
    public Blog getCustomer1(@PathVariable Integer id) throws JsonProcessingException{
         Blog req = customerRepository.getReferenceById(id);
        Blog customer = new Blog();
        customer.setTitle(req.getTitle());
        customer.setCreated(req.getCreated());
        customer.setOverview(req.getCreated());
        customer.setText(req.getText());
        customer.setId(id);
        return customer;
    }

    /* 
    @CrossOrigin(origins = "*")
    @GetMapping("{id}")
    public String getCustomer(@PathVariable Integer id) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
         Blog customer = customerRepository.getReferenceById(id);
        // String json = objectMapper.writeValueAsString(customer);
         System.out.println(customer);
        return customer.toString();
    }
    */
}