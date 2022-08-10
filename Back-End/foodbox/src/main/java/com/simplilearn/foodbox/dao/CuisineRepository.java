package com.simplilearn.foodbox.dao;

import com.simplilearn.foodbox.entity.Cuisine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface CuisineRepository extends JpaRepository<Cuisine, Long> {



}
