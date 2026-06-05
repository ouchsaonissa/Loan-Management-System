package com.group6.loanmanagement;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;

class CustomerControllerTest {

    @Test
    void customerControllerIsRestControllerWithCustomerBaseRoute() throws Exception {
        Class<?> controllerClass = Class.forName("com.group6.loanmanagement.controller.CustomerController");
        Class<?> serviceClass = Class.forName("com.group6.loanmanagement.service.CustomerService");

        mock(serviceClass);

        Set<String> annotationNames = Arrays.stream(controllerClass.getAnnotations())
                .map(annotation -> annotation.annotationType().getSimpleName())
                .collect(Collectors.toSet());

        assertTrue(annotationNames.contains("RestController"), "CustomerController should be a Spring REST controller");
        assertTrue(hasMappingAnnotationContaining(controllerClass.getAnnotations(), "/api/customers"),
                "CustomerController should be mapped to /api/customers");
    }

    @Test
    void customerControllerExposesCrudEndpointMethods() throws Exception {
        Class<?> controllerClass = Class.forName("com.group6.loanmanagement.controller.CustomerController");

        assertTrue(hasMethodWithAnnotation(controllerClass, "GetMapping"), "CustomerController should expose GET endpoints");
        assertTrue(hasMethodWithAnnotation(controllerClass, "PostMapping"), "CustomerController should expose POST endpoints");
        assertTrue(hasMethodWithAnnotation(controllerClass, "PutMapping"), "CustomerController should expose PUT endpoints");
        assertTrue(hasMethodWithAnnotation(controllerClass, "DeleteMapping"), "CustomerController should expose DELETE endpoints");
    }

    private boolean hasMethodWithAnnotation(Class<?> type, String annotationSimpleName) {
        return Arrays.stream(type.getMethods())
                .flatMap(method -> Arrays.stream(method.getAnnotations()))
                .map(annotation -> annotation.annotationType().getSimpleName())
                .anyMatch(annotationSimpleName::equals);
    }

    private boolean hasMappingAnnotationContaining(Annotation[] annotations, String expectedRoute) {
        return Arrays.stream(annotations)
                .anyMatch(annotation -> annotation.annotationType().getSimpleName().equals("RequestMapping")
                        && Arrays.stream(annotation.annotationType().getDeclaredMethods())
                                .filter(method -> method.getParameterCount() == 0)
                                .map(method -> invokeAnnotationMethod(annotation, method))
                                .anyMatch(value -> String.valueOf(value).contains(expectedRoute)));
    }

    private Object invokeAnnotationMethod(Annotation annotation, Method method) {
        try {
            Object value = method.invoke(annotation);
            if (value instanceof Object[]) {
                return Arrays.toString((Object[]) value);
            }
            return value;
        } catch (ReflectiveOperationException exception) {
            return "";
        }
    }
}
