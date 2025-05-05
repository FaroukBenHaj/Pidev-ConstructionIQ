package tn.esprit.reclamationdomain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ClaimService {
    @Autowired
    private ClaimRepository claimRepository;

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public Claim getClaimById(Long id) {
        return claimRepository.findById(id).orElse(null);
    }

    public Claim createClaim(Claim claim) {
        return claimRepository.save(claim);
    }

    public Claim updateClaim(Long id, Claim claimDetails) {
        Claim claim = claimRepository.findById(id).orElse(null);
        if (claim != null) {
            // Update all fields
            claim.setSender(claimDetails.getSender());
            claim.setReceiver(claimDetails.getReceiver());
            // ... update all other fields
            return claimRepository.save(claim);
        }
        return null;
    }

    public void deleteClaim(Long id) {
        claimRepository.deleteById(id);
    }
}
