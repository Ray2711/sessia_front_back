package com.nurique.security.blogs;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Blog {
    @Id
    @SequenceGenerator(
        name = "blog_id_sequence",
        sequenceName = "blog_id_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "blog_id_sequence"
    )
    private Integer id;
    private String title;
    private String overview;
    @Column(length = 2048)
    private String text;
    private String created;

    public Blog(Integer id,
                    String name,
                    String created,
                    String overview,
                    String text
    ){
        this.id = id;
        this.title = name;
        this.overview = overview;
        this.text = text;
        this.created = created;
    }

    public Blog(){

    }

    public String getCreated() {
        return created;
    }
    public String getText() {
        return text;
    }
    public String getOverview() {
        return overview;
    }
    public Integer getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public void setCreated(String created) {
        this.created = created;
    }
    public void setText(String text) {
        this.text = text;
    }

    public void setOverview(String email) {
        this.overview = email;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public void setTitle(String name) {
        this.title = name;
    }

    public String toString(){
        return "{\"id\": \""+id+"\", \n "+"\"title\":\""+title+"\", \n "+"\"overview\":\""+overview+"\", \n "+"\"text\":\""+text+"\", \n "+"\"created\":\""+created+"\", \n }";

    }
    

}
