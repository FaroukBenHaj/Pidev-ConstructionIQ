package tn.esprit.userdomain.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//@Service
@RequiredArgsConstructor
// Extends OncePerRequestFilter pour que ce filtre soit exécuté une seule fois par requête.
public class JwtFilter{ /*} extends OncePerRequestFilter {
    private final  JwtService jwtService;

    private final UserDetailServiceIImpl userDetailServiceIImpl;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull  FilterChain filterChain
    ) throws ServletException, IOException {
        // Si la requête concerne le chemin d'authentification (ex: /api/v1/auth), on ne fait rien et on continue le traitement.
        if( request.getServletPath().contains("/api/v1/auth")){
        filterChain.doFilter(request, response);
        return;
    }
    final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String jwt ;
    final String userEmail;
    //"Bearer" est un type de token utilisé dans les en-têtes HTTP
        // Vérification de la présence du token et de son préfixe "Bearer ".
    if(authorization == null || !authorization.startsWith("Bearer ")){
        filterChain.doFilter(request, response); // Si le token n'est pas présent, on passe à la suite de la chaîne de filtres.
        return;
    }

    jwt = authorization.substring(7);
    userEmail = jwtService.extractUserName(jwt);

    if(userEmail != null || SecurityContextHolder.getContext().getAuthentication() == null){
        UserDetails userDetails = userDetailServiceIImpl.loadUserByUsername(userEmail);
        if(jwtService.isTokenValid(jwt , userDetails)){
            UsernamePasswordAuthenticationToken authToken  = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities());
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }
    filterChain.doFilter(request, response);
    }**/
}
